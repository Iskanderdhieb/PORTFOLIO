"""Serve this static portfolio with HTTP byte-range support for video playback."""

from __future__ import annotations

import argparse
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class RangeRequestHandler(SimpleHTTPRequestHandler):
    """A small static file handler that supports single byte-range requests."""

    protocol_version = "HTTP/1.1"

    def __init__(self, *args, directory: str, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def _file_response(self, send_body: bool) -> None:
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            if not self.path.endswith("/"):
                self.send_response(301)
                self.send_header("Location", self.path + "/")
                self.send_header("Content-Length", "0")
                self.end_headers()
                return
            if os.path.isfile(os.path.join(path, "index.html")):
                path = os.path.join(path, "index.html")
            else:
                if send_body:
                    super().do_GET()
                else:
                    super().do_HEAD()
                return

        try:
            file_obj = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return

        size = os.fstat(file_obj.fileno()).st_size
        start, end = 0, size - 1
        range_header = self.headers.get("Range")
        status = 200

        if range_header:
            match = re.fullmatch(r"bytes=(\d*)-(\d*)", range_header.strip())
            if match and size:
                first, last = match.groups()
                if first:
                    start = int(first)
                    end = min(int(last), size - 1) if last else size - 1
                elif last:
                    suffix_length = int(last)
                    start = max(size - suffix_length, 0)
                    end = size - 1
                if start >= size or end < start:
                    file_obj.close()
                    self.send_response(416)
                    self.send_header("Content-Range", f"bytes */{size}")
                    self.send_header("Content-Length", "0")
                    self.end_headers()
                    return
                status = 206
            elif match:
                file_obj.close()
                self.send_response(416)
                self.send_header("Content-Range", "bytes */0")
                self.send_header("Content-Length", "0")
                self.end_headers()
                return

        content_length = end - start + 1 if size else 0
        self.send_response(status)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(content_length))
        self.send_header("Last-Modified", self.date_time_string(os.path.getmtime(path)))
        if status == 206:
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.end_headers()

        if send_body and content_length:
            try:
                file_obj.seek(start)
                remaining = content_length
                while remaining:
                    chunk = file_obj.read(min(64 * 1024, remaining))
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    remaining -= len(chunk)
            except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
                # Browsers can cancel a media range when the user seeks or leaves.
                pass
        file_obj.close()

    def do_GET(self) -> None:
        self._file_response(send_body=True)

    def do_HEAD(self) -> None:
        self._file_response(send_body=False)

    def log_message(self, format: str, *args) -> None:
        # Keep the console useful while avoiding tracebacks when a browser cancels a range.
        print(f"{self.address_string()} - {format % args}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="0.0.0.0", help="interface to listen on (default: all interfaces)")
    parser.add_argument("--port", type=int, default=8000, help="HTTP port (default: 8000)")
    args = parser.parse_args()

    root = str(Path(__file__).resolve().parent)
    handler = lambda *a, **kw: RangeRequestHandler(*a, directory=root, **kw)
    server = ThreadingHTTPServer((args.host, args.port), handler)
    print(f"Portfolio served from {root} at http://{args.host}:{args.port}/ (byte ranges enabled)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nPortfolio server stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
