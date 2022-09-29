import 'boxicons'

export default function SelectionButton({sectionName, setSelection, section}){
    return (
        <button className={section == sectionName.toLowerCase() 
            ? "text-lg cursor-pointer py-2 text-white font-semibold bg-slate-500"
            : "border border-slate-300 text-lg cursor-pointer py-2 text-slate-600 font-semibold flex items-center justify-center"
        } onClick={(x) => setSelection(sectionName.toLowerCase())}>{sectionName}</button>
    )
}