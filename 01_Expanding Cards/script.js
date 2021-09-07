const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        console.log(panel);
        removeActiveClass();
        panel.classList.add('active');
    })
})

const removeActiveClass = () => {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}