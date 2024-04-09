const formatDate = (dateFromMongo: string) => {
    const currentDate: object = new Date();
    const savedDate: object = new Date(dateFromMongo);
    
    const differenceInMilliseconds = currentDate - savedDate;
    
    const differenceInSeconds = Math.round(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.round(differenceInSeconds / 60);
    const differenceInHours: number = Math.round(differenceInMinutes / 60);
    const differenceInDays = Math.round(differenceInHours / 24);

    if (differenceInMinutes === 0) { return 'now'}
    if (differenceInMinutes >= 0 && differenceInMinutes < 60) { return `${differenceInMinutes} minutes`}
    if (differenceInHours >= 0 && differenceInHours < 24) { return `${differenceInHours} hours`}
    if (differenceInHours >= 24) { return `${differenceInDays} days`}
}

export default formatDate;