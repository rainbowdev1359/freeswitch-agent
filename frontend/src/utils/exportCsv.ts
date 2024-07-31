// utils/exportCsv.ts
export const exportToCsv = (filename: string, rows: (string | number)[][]): void => {
    const processRow = (row: (string | number)[]): string => {
        return row
            .map((val) => {
                if (typeof val === 'string') {
                    val = val.replace(/"/g, '""');
                    return `"${val}"`;
                }
                return val;
            })
            .join(',');
    };

    let csvFile = '';
    rows.forEach((row) => {
        csvFile += processRow(row) + '\n';
    });

    const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
