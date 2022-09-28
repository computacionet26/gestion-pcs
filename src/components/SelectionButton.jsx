export default function SelectionButton({sectionName, setSelection}){
    return (
        <button className={section == sectionName.toLowerCase() 
            ? "border text-lg cursor-pointer py-2 rounded text-white font-semibold bg-slate-500"
            : "border text-lg cursor-pointer py-2 rounded text-slate-600 font-semibold0"
        } onClick={(x) => setSelection(sectionName.toLowerCase())}>{sectionName}</button>
    )
}