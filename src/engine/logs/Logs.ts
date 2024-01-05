export interface LogEntry {
  loglevel: string;
  filename: string;
  timestamp: string;
  message: string;
  traceback?: string;
  tags: string;
}