import testRule from './__helpers__/testRule';
import { DiagnosticSeverity } from '@stoplight/types';

testRule('xgen-IPA-108-delete-include-404-response', [
  {
    name: 'valid DELETE with 404',
    document: {
      paths: {
        '/resource/{id}': {
          delete: {
            responses: {
              204: {},
              404: {
                description: 'Resource not found',
              },
            },
          },
        },
      },
    },
    errors: [],
  },
  {
    name: 'invalid DELETE with no responses',
    document: {
      paths: {
        '/resource/{id}': {
          delete: {},
        },
      },
    },
    errors: [
      {
        code: 'xgen-IPA-108-delete-include-404-response',
        message: 'DELETE method should include 404 status code for not found resources.',
        path: ['paths', '/resource/{id}', 'delete'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: 'invalid empty responses',
    document: {
      paths: {
        '/resource/{id}': {
          delete: {
            responses: {},
          },
        },
      },
    },
    errors: [
      {
        code: 'xgen-IPA-108-delete-include-404-response',
        message: 'DELETE method should include 404 status code for not found resources.',
        path: ['paths', '/resource/{id}', 'delete'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: 'invalid DELETE missing 404',
    document: {
      paths: {
        '/resource/{id}': {
          delete: {
            responses: {
              204: {},
            },
          },
        },
      },
    },
    errors: [
      {
        code: 'xgen-IPA-108-delete-include-404-response',
        message: 'DELETE method should include 404 status code for not found resources.',
        path: ['paths', '/resource/{id}', 'delete'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: 'valid with exception',
    document: {
      paths: {
        '/resource/{id}': {
          delete: {
            'x-xgen-IPA-exception': {
              'xgen-IPA-108-delete-include-404-response': 'Idempotent delete',
            },
            responses: {
              204: {},
            },
          },
        },
      },
    },
    errors: [],
  },
  {
    name: 'skipped for collection endpoint (no path parameter)',
    document: {
      paths: {
        '/resources': {
          delete: {
            responses: {
              204: {},
            },
          },
        },
      },
    },
    errors: [],
  },
  {
    name: 'applied for single resource endpoint (with path parameter)',
    document: {
      paths: {
        '/resources/{resourceId}': {
          delete: {
            responses: {
              204: {},
            },
          },
        },
      },
    },
    errors: [
      {
        code: 'xgen-IPA-108-delete-include-404-response',
        message: 'DELETE method should include 404 status code for not found resources.',
        path: ['paths', '/resources/{resourceId}', 'delete'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
