/* eslint-disable no-return-await */
export default class ResponseBuilder {
    /**
     * Send response
     * @param res
     * @param statusCode number
     * @param message string
     * @param result Object
     * @returns Object
     */
    public static async responseBuilder(
      res: any,
      status: number,
      message: string,
      result?: any
    ) {
      return res.status(status).json({ status, message, result });
    }
    
  }
  