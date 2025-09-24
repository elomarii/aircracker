import { Button } from "@headlessui/react"
import { MouseEventHandler } from "react"

const buttonStyle = "inline-flex justify-start gap-x-1.5 rounded-md bg-white/10 px-3 py-1 my-1 text-sm w-fit inset-ring-1 inset-ring-white/5 hover:bg-white/20"

interface ButtonProps {
    text: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

function SimpleButton({text, onClick}: ButtonProps) {
    return (
        <Button className={buttonStyle} onClick={onClick}>
            {text}
        </Button>
    )
}

export default SimpleButton
