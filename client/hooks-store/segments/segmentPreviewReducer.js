export const PREVIEW_SEGMENT = 'PREVIEW_SEGMENT'

export const PLACE_PREVIEW_TO_FIRST = 'PLACE_PREVIEW_TO_FIRST'

export const PLACE_PREVIEW_TO_NTH = 'PLACE_PREVIEW_TO_NTH'

export const DELETE_FIRST_OR_LAST = 'DELETE_FIRST_OR_LAST'

export const DELETE_PREVIEW = 'DELETE_PREVIEW'

export const previewSegment = segment => ({
  type: PREVIEW_SEGMENT,
  segment
})

const segmentPreviewReducer = (segmentPreviewState, action) => {
  switch (action.type) {
    case PREVIEW_SEGMENT:
      return [action.segment]
    case PLACE_PREVIEW_TO_FIRST:
      return []
    case PLACE_PREVIEW_TO_NTH:
      return []
    case DELETE_PREVIEW:
      return []
    default:
      return segmentPreviewState
  }
}

export default segmentPreviewReducer
