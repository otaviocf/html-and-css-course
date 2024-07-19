document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('nav');
    function callHeaderTransparency() {
        if (window.scrollY > 0) {
            header.classList.add('transparent')
        } else {
            header.classList.remove('transparent')
        }
    }
    window.addEventListener('scroll', callHeaderTransparency);
});