
    let now = new Date(document.lastModified);
    let monthNames =['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    var thisMonth = monthNames[now.getMonth()];
    var day = now.getDate();
    var year = now.getFullYear();
    var updatedDate ="Last updated: " + day.toString() + " " + thisMonth 
                + " " + year.toString();

    document.getElementById('datePlace').innerHTML = updatedDate;
