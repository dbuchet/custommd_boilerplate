import { useState, useEffect } from 'react';
import { Prism as PrismSyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';

const CodeHighlighter = ({ className, language, value }) => {

    // Workaround to try to differ setting the value to syntax highlighter, because looks like there is race concurence if we immediately set value to component
    // https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/513
    // https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/538
    const [_value, _setValue] = useState('');
    useEffect(() => _setValue(value), [value]);
    // --

    if (!value || value === '') return null;

    return (
        <div className={className}>
            <PrismSyntaxHighlighter
                language={language}
                style={theme}
                showLineNumbers
            >
                {_value}
            </PrismSyntaxHighlighter>
        </div>
    );

};

export default CodeHighlighter;
