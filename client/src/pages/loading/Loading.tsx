

const Loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex items-center gap-2">
                <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600"></span>
                <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:150ms]"></span>
                <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:300ms]"></span>
            </div>
        </div>
    )
}

export default Loading