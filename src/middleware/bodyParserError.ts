const bodyParserError = (error: any, req: any, res: any, next: () => void) => {
    if (error) {
      return res.status(400).json({
        message: req.t('ERR_GENRIC_SYNTAX'),
        code: 400,
        status: false,
        result: null,
      });
    }
    return next();
  };
  
  export default bodyParserError;
  