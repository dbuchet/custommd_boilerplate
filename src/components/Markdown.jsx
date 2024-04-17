import { memo, useMemo } from 'react';
import MarkdownRender from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PLUGINS_REMARK = [
    [remarkGfm],
];

const EMPTY_ARRAY = [];

const MarkdownComponent = ({
    className,
    value = "",
    renderers = EMPTY_ARRAY
}) => {

    //-- RENDERERS
    const _renderers = useMemo(() => Object.assign(
        {
            code: ({ inline, className, children, ...props }) => {
                if (inline) {
                    return <code className={className} {...props}>{children}</code>;
                }

                // Code
                const language = (className || '').replace('language-', '');
                const value = String(children);
                const args = props?.node?.data?.meta?.split(' ') ?? [];

                // Check for extended plugins
                const matchPlugin = renderers.find(plugin => plugin.render && plugin.match?.(language, args, value));
                if (matchPlugin) return matchPlugin.render(language, args, value);

                // Nothing matched, return a simple <code> block
                return <code className={className} {...props}>{children}</code>;
            },
            img: ({ src, alt }) => {
                return (
                    <div className="content--img">
                        <img src={src} alt={alt ?? ''} />
                    </div>);
            },
            p: ({ children }) => {
                return <p>{children}</p>;
            },
        },
    ), [renderers]);

    return (
        <MarkdownRender
            className={className}
            components={_renderers}
            remarkPlugins={PLUGINS_REMARK}
        >
        {value}
        </MarkdownRender>
    );
};

const Markdown = memo(MarkdownComponent)

export default Markdown;