import Ajv from 'ajv';
import Boom from 'boom';

export default function(schemas = {}) {
  const ajv = new Ajv();

  return function(target, key, descriptor) {
    const schema = schemas[key];
    if (!schema) return descriptor;

    descriptor.value = new Proxy(target[key], {
      apply: async function(method, self, [ctx, next]) {
        const valid = ajv.validate(schema, ctx.request.body);
        if (valid) return method.call(self, ctx, next);
        throw Boom.badRequest(ajv.errors);
      },
    });

    return descriptor;
  };
}
