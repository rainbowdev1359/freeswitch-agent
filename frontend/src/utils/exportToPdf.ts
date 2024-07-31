import jsPDF from 'jspdf';

export const exportToPdf = async (data: any[], headers: string[], filename: string) => {
    const table = `
    <table>
      <thead>
        <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${data.map(row => `<tr>${Object.values(row).map((item) => `<td style="border: 1px solid gray; color: black; padding: 6px;">${item}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  `;

    const input = document.createElement('div');
    input.innerHTML = table;
    const pdf = new jsPDF();
    pdf.html(input, {
        x: 5,
        y: 10,
        html2canvas: {
            scale: 0.25
        },
        callback: () => {
            pdf.save(`${filename}.pdf`);
        }
    });
};
