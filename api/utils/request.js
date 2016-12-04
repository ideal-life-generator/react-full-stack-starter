import request from 'request-promise';

export default request.defaults({
  transform(body, { statusCode: status, headers: { 'content-type': contentType } }) {
    const responseBase = { status };

    switch (contentType) {
      case 'application/json; charset=utf-8': {
        const data = JSON.parse(body);

        return {
          ...responseBase,
          data,
        };
      }
      default: {
        return {
          ...responseBase,
          data: body,
        };
      }
    }
  },
});
