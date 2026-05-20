import { MainLayout } from "layouts/mainLayout/mainLayout"

import rules from "assets/rules.pdf"
import { PDFViewer } from "components/pdfViewer/pdfViewer"

import styles from "./styles.module.scss"

export const RulesPage = () => {
  return (
    <MainLayout showBackButton showHeader heading="Rules" className={styles.container}>
      <PDFViewer file={rules} className={styles.pdf} />
    </MainLayout>
  )
}
