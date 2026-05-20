import * as React from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
import { classes } from "utils/classes"

import styles from "./styles.module.scss"
import { Button } from "components/button/button"

interface Props {
  hideControls?: boolean
  file: string
  className?: string
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export const PDFViewer = (props: Props) => {
  const { file, hideControls, className } = props

  const viewerRef = React.useRef<HTMLDivElement>(null)

  const [numPages, setNumPages] = React.useState(0)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [pageWidth, setPageWidth] = React.useState(0)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const previousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }

  const nextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages))
  }

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        previousPage()
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        nextPage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [numPages])

  React.useEffect(() => {
    if (!viewerRef.current) return

    const observer = new ResizeObserver(() => {
      setPageWidth(viewerRef.current?.clientWidth || 0)
    })

    observer.observe(viewerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={classes(styles.container, className)}>
      <div ref={viewerRef} className={styles.viewer}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className={styles.document}>
          <Page
            pageNumber={pageNumber}
            width={pageWidth}
            className={styles.page}
            onRenderSuccess={(page) => {
              if (!viewerRef.current || !page.height || !page.width) return

              const maxHeight = viewerRef.current.clientHeight
              if (page.height <= maxHeight) return

              const scale = maxHeight / page.height
              const nextWidth = Math.floor(page.width * scale)

              if (nextWidth > 0 && nextWidth !== pageWidth) {
                setPageWidth(nextWidth)
              }
            }}
          />
        </Document>
      </div>

      {!hideControls && (
        <div className={styles.controls}>
          <Button label="Previous" onClick={previousPage} disabled={pageNumber <= 1} className={styles.controlButton} />

          <div className={styles.controlsPageNumber}>
            {pageNumber} / {numPages}
          </div>

          <Button label="Next" onClick={nextPage} disabled={pageNumber >= numPages} className={styles.controlButton} />
        </div>
      )}
    </div>
  )
}
