type Props = {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
};

export default function PaginationControls({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
}: Props) {
    return (
        <div className="pagination-controls">
            <button onClick={onPrevious} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={onNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}