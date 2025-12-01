import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

export interface ExportData {
  title: string
  headers: string[]
  rows: (string | number)[][]
}

export const exportToPDF = (data: ExportData, filename: string = 'report') => {
  const doc = new jsPDF()
  
  // Заголовок
  doc.setFontSize(18)
  doc.text(data.title, 14, 20)
  
  // Таблица
  const startY = 30
  const cellHeight = 7
  const cellWidth = 40
  
  // Заголовки таблицы
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  data.headers.forEach((header, index) => {
    doc.text(header, 14 + index * cellWidth, startY)
  })
  
  // Данные
  doc.setFont('helvetica', 'normal')
  data.rows.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      doc.text(String(cell), 14 + colIndex * cellWidth, startY + (rowIndex + 1) * cellHeight)
    })
  })
  
  doc.save(`${filename}.pdf`)
}

export const exportToExcel = (data: ExportData, filename: string = 'report') => {
  const worksheet = XLSX.utils.aoa_to_sheet([
    [data.title],
    [],
    data.headers,
    ...data.rows
  ])
  
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчёт')
  
  const fileName = filename || 'report'
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

