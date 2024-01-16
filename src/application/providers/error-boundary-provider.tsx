import {error} from "console"
import React, {PropsWithChildren} from "react"

class ErrorBoundaryProvider extends React.Component {
	state: {
		error: null | Error
	}

	constructor(props: PropsWithChildren) {
		super(props)

		// Define a state variable to track whether is an error or not
		this.state = {error: null}
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI
		console.log(error)
		return {error}
	}

	componentDidCatch(error: unknown, errorInfo: unknown) {
		// You can use your own error logging service here
		console.log({error, errorInfo})
	}

	render() {
		// Check if the error is thrown
		if (this.state.error) {
			// You can render any custom fallback UI
			return (
				<div className="w-full min-h-screen flex flex-col items-center justify-center md:container px-6">
					<div className="flex items-center">
						<span className="font-medium">Помилка на стороні клієнта!</span> <span className="mx-3 text-[10px]">|</span>
						<span>{this.state.error.message}</span>
					</div>

					<p className="mt-3 text-sm">Зверніться до тех. підтримки!</p>
				</div>
			)
		}

		// @ts-ignore
		return this.props.children
	}
}

export {ErrorBoundaryProvider}
