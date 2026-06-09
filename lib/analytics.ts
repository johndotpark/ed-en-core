import posthog from 'posthog-js'

function log(event: string, properties: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, properties)
  }
}

function capture(event: string, properties: Record<string, unknown>) {
  try {
    log(event, properties)
    posthog.capture(event, properties)
  } catch {
    // fail silently — never block user actions
  }
}

export function trackPromptStarted(properties: {
  product_type?: string
  production_stage?: string
  source_page?: string
}) {
  capture('prompt_started', properties)
}

export function trackPromptGenerated(properties: {
  product_type?: string
  production_stage?: string
  selected_option_count?: number
  source_page?: string
}) {
  capture('prompt_generated', properties)
}

export function trackPromptCopied(properties: {
  product_type?: string
  production_stage?: string
  source_page?: string
}) {
  capture('prompt_copied', properties)
}

export function trackPromptPdfDownloaded(properties: {
  product_type?: string
  production_stage?: string
  source_page?: string
}) {
  capture('prompt_pdf_downloaded', properties)
}

export function trackTemplateDownloaded(properties: {
  template_name?: string
  template_category?: string
  file_type?: string
  source_page?: string
}) {
  capture('template_downloaded', properties)
}

export function trackChecklistStarted(properties: {
  checklist_name?: string
  total_items?: number
  source_page?: string
}) {
  capture('checklist_started', properties)
}

export function trackChecklistReturned(properties: {
  checklist_name?: string
  completed_items?: number
  total_items?: number
  completion_percentage?: number
  days_since_started?: number
  source_page?: string
}) {
  capture('checklist_returned', properties)
}
