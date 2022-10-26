import { useEffect } from "react"

export default function({device}) {

    useEffect(() => {
            const canvas = document.getElementById('qr-canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = 500
            canvas.height = 525
            ctx.width = 500
            ctx.height = 545
            const img = new Image()
            img.src = device.img
            img.onload = event => {
                // console.log(event);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 0, 0, 500, 500)
                ctx.font = "30px Arial";
                ctx.fillStyle = 'rgba(25, 25, 25, 1)'
                ctx.fillText(`ID: ${device.id} - LAB: ${device.lab}`, 50, 480);
            }

            canvas.onclick = () => {
                const img = canvas.toDataURL('image/png')
                const a = document.createElement("a")
                a.href = img
                a.download = `ID ${device.id} - LAB ${device.lab}.png`;
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a) 
            }
    }, [])

    return (
        <canvas className="bg-white cursor-pointer" id="qr-canvas">
                            
        </canvas>
    )
}