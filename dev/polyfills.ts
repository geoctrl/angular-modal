import 'core-js/client/shim';
import 'reflect-metadata';

require('zone.js/dist/zone');

if (process.env.ENV === 'build') {
  // production
} else {
  // development

  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}