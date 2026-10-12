/*
Copyright (c) 2026 EigenPal, Inc. All rights reserved.
Licensed under the EigenPal Pro Evaluation License 1.0 — see packages/editor-api/LICENSE.md.
Production use requires a commercial agreement: licensing@eigenpal.com
*/
import {
  createAutomationPaginationProvider,
  type AutomationPaginationOptions,
  type AutomationPaginationProvider,
} from '@onsitesai/docx-editor-core/automation';

/** Explicit measurement inputs for headless field calculation. @public */
export interface ServerPaginationOptions extends AutomationPaginationOptions {}

export function serverPagination(options: ServerPaginationOptions): AutomationPaginationProvider {
  return createAutomationPaginationProvider(options);
}
