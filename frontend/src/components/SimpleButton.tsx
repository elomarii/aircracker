import { Button } from "@headlessui/react"

const buttonStyle = "inline-flex justify-start gap-x-1.5 rounded-md bg-white/10 px-3 py-1 my-1 text-sm inset-ring-1 inset-ring-white/5 hover:bg-white/20"

interface ButtonProps {
    text: string
}

function SimpleButton({text}: ButtonProps) {
    return (
        <Button className={buttonStyle}>
            {text}
        </Button>
    )
}

export default SimpleButton
