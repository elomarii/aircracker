import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const menuButtonCss = "inline-flex w-full justify-start gap-x-1.5 rounded-md bg-white/10 px-3 py-1 my-1 text-sm inset-ring-1 inset-ring-white/5 hover:bg-white/20"
const menuItemsCss = "absolute left-0 z-10 w-full origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"

interface SelectionMenuProps {
    items: string[];
    selection?: string;
    onSelect: (value: string) => void;
}

function SelectionMenu({items, selection, onSelect}: SelectionMenuProps) {

    return (
    <Menu as="div" className="relative inline-block w-full">
        <MenuButton className={menuButtonCss}>{selection}</MenuButton>

        <MenuItems transition className={menuItemsCss}>
            <div className="py-1">
                {items.map((item, index) => (
                    <MenuItem as="div" className="px-2 text-sm" key={index} onClick={()=>onSelect(item)}>
                        {item}
                    </MenuItem>
                ))}
            </div>
        </MenuItems>
    </Menu>
    )
}

export default SelectionMenu
