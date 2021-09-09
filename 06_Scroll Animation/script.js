const boxes = document.querySelectorAll('.box');

checkBoxes();

window.addEventListener('scroll', checkBoxes);

function checkBoxes() {
    const triggerBotton = window.innerHeight * 4 / 5;
    console.log(triggerBotton);

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBotton) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
}