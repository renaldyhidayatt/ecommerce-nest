
export default function ModalSlider() {
    return (
        <div
            className="modal fade text-left"
            id="slider"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="slider"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="slider">
                            Add Slider
                        </h4>
                        <button
                            type="button"
                            className="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <i data-feather="x" />
                        </button>
                    </div>
                    <form
                        action="<?= base_url('admin/slider'); ?>"
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <div className="modal-body">
                            <label htmlFor="nama">Nama: </label>
                            <div className="form-group">
                                <input
                                    id="nama"
                                    type="text"
                                    name="nama"
                                    placeholder="Nama"
                                    className="form-control"
                                />
                            </div>
                            <label htmlFor="image">image: </label>
                            <div className="form-group">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-light-secondary"
                                data-bs-dismiss="modal"
                            >
                                <i className="bx bx-x d-block d-sm-none" />
                                <span className="d-none d-sm-block">Close</span>
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary ms-1"
                                data-bs-dismiss="modal"
                            >
                                <i className="bx bx-check d-block d-sm-none" />
                                <span className="d-none d-sm-block">Adding</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}