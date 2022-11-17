// button color change
export const handleMouseMove = (e) => {
    const butt = e.target
    const rect = butt.getBoundingClientRect(); // has to bound on the element the background position is set with xy

    const x = (e.clientX - rect.left) * 100 / butt.clientWidth;
    const y = (e.clientY - rect.top) * 100 / butt.clientHeight;
    butt.style.setProperty('--mouse-x', x);
    butt.style.setProperty('--mouse-y', y);
}

// unset and set the bottom border for form
export const handleDivTopBorder = (divRef) => {
    // console.log(divRef)
    if (divRef.current) divRef.current.style.setProperty('border-bottom', '0px')
}

export const handleDivTopBorderOut = (divRef) => {
    if (divRef.current) divRef.current.style.setProperty('border-bottom', '1px solid rgb(113, 113, 113)')
}

export const handleLabelSmall = (labelRef) => {
    if (labelRef.current) labelRef.current.style.setProperty('font-size', '0.8rem')
    if (labelRef.current) labelRef.current.style.setProperty('padding-top', '2px')
}

export const handleLabelBig = (labelRef, inputRef) => {
    if (inputRef.current) {
        // console.log('input value', inputRef.current.children[0].value)
        if (!inputRef.current.children[0].value) {
            if (labelRef.current) labelRef.current.style.setProperty('font-size', 'unset')
            if (labelRef.current) labelRef.current.style.setProperty('padding-top', '12px')
        }
    }
}