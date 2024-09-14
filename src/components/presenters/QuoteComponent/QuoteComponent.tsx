import React from 'react';
import {Quote} from "../../../models/quote";

const QuoteComponent = ({ text, author, context }: Quote) => (
	<div>
		<blockquote>"{text}"</blockquote>
		<p>- {author} {context && `(${context})`}</p>
	</div>
);

export default QuoteComponent;
