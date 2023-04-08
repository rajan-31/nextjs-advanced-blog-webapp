import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function NoSSRTextEditor({ value, onChange }) {
	const quillModules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			['bold', 'italic', 'underline', 'strike'], // toggled buttons
			['blockquote', 'code-block'],

			// [{ header: 1 }, { header: 2 }], // custom button values
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
			[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
			[{ direction: 'rtl' }], // text direction

			// [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ font: [] }],
			[{ align: [] }],

			['clean'], // remove formatting button
		],
	}
	return (
		<ReactQuill
			value={value}
			onChange={onChange}
			theme='snow'
			placeholder='Compose your blog...'
			modules={quillModules}
		/>
	)
}
