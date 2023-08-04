export function currencyFormat(num) {
    if (num)
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return '0 đ';
}

export function ageVote(product) {
    let age = 0;
    if (product.total_vote > 0) {
        age = product.stat_vote / product.total_vote ;
        age = age.toFixed(2);
    }

    return age;
}

export function ageVoteStatic(count_number,total_vote ) {
    let age = 0;
    if (total_vote > 0) {
        age = (count_number / total_vote) * 100;
        age = age.toFixed(1);
    }

    return age;
}

export function imageDefault()
{
    return 'https://123code.net/images/preloader.png';
}
