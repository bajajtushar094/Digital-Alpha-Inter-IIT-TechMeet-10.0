import axios from 'axios';

export const handleDownloadPost = (url, body) => {
    axios.post(url, body)
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'company.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
}

export const handleDownloadGet = (url) => {
    axios.get(url)
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'company.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
}