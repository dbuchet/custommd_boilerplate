const CustomMd = ({args, value}) => 
{
    return (
        <div>
            {`Hello there! I'm custom MD with:`}
            <ul>
                <li><b>args:</b> {args.join(' ')}</li>
                <li><b>value:</b> {value}</li>
            </ul>
        </div>
    )
}

export default CustomMd;