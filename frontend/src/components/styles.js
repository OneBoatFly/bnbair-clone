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