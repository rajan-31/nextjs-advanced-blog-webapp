import { compile } from 'html-to-text'

/**
 * Utility functions
 */
const compiledConvert = compile({ wordwrap: 80 })
export function convertHtmlContentToText(blogDataList) {
	return blogDataList.constructor === Array
		? blogDataList.map(item => {
				item.content = compiledConvert(item.content).slice(0, 300)
				return item
		  })
		: []
}
