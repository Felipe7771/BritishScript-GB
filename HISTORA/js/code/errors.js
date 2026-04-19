class HistoraError extends Error {
    constructor(message, line_error) {
        super(message, line_error);
        this.line_error = line_error;
    }
}

class CaseFormatError extends HistoraError {
  constructor(line_content, message, line_error, id_local_error) {
    super(message, line_error);
    this.name = "CaseFormatError";
    this.line_content = line_content
    this.line_error = line_error;
    this.id_local_error = id_local_error
  }
}

class FinalPointFormatError extends HistoraError {
  constructor(line_content, message, line_error, id_local_error) {
    super(message, line_error);
    this.name = "FinalPointFormatError";
    this.line_content = line_content
    this.line_error = line_error;
    this.id_local_error = id_local_error
  }
}

class EndLineCommaFormatError extends HistoraError {
  constructor(line_content, message, line_error, id_local_error) {
    super(message, line_error);
    this.name = "EndLineCommaFormatError";
    this.line_content = line_content
    this.line_error = line_error;
    this.id_local_error = id_local_error
  }
}