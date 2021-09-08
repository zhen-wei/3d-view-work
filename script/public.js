/**@type { NodeListOf<HTMLAnchorElement> } */
const navItem = document.querySelectorAll('#topBar > li');

const menuShow = navItem[0].querySelector('a');

let navItemVisible = document.body.clientWidth > 700 ? true : false;

menuShow.addEventListener('click', () => {
    if (!navItemVisible) {
        for(let i = 1; i < navItem.length; i++) {
            navItem[i].style.visibility = 'visible';
        }
        navItemVisible = true;
        setTimeout(() => {
            document.body.addEventListener('click', ev => {
                if (navItemVisible && ev.target !== menuShow && document.body.clientWidth < 701) {
                    for(let i = 1; i < navItem.length; i++) {
                        navItem[i].style.visibility = 'hidden';
                    }
                    navItemVisible = false;
                }
                console.log('!')
            }, {once:true}); 
        });
    } else {
        for(let i = 1; i < navItem.length; i++) {
            navItem[i].style.visibility = 'hidden';
        }
        navItemVisible = false;
    }
    console.log('?')
});

window.addEventListener('resize', ev => {
    if (document.body.clientWidth > 700) {
        if (!navItemVisible) {
            for(let i = 1; i < navItem.length; i++) {
                navItem[i].style.visibility = 'visible';
            }
            navItemVisible = true;
        }
    } else {
        if (navItemVisible) {
            for(let i = 1; i < navItem.length; i++) {
                navItem[i].style.visibility = 'hidden';
            }
            navItemVisible = false;
        }
    }
});