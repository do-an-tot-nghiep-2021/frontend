import { SetUser } from "../../../../hooks/useAccount"
const ProfileScreenAuth = () => {
    return (
        <>
            <div className="m-subheader ">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h3 className="m-subheader__title ">My Profile</h3>
                    </div>
                </div>
            </div>
            <div className="m-content">
                <div className="m-portlet m-portlet--full-height m-portlet--tabs  ">
                    <div className="tab-content">
                        <div className="tab-pane active" id="m_user_profile_tab_1">
                            <form className="m-form m-form--fit m-form--label-align-right">
                                <div className="m-portlet__body">
                                    <div className="row">
                                        <div className="col-xl-8">
                                            <div className="form-group m-form__group row">
                                                <div className="col-10 ml-auto">
                                                    <h3 className="m-form__section">Thông tin cá nhân</h3>
                                                </div>
                                            </div>
                                            <div className="form-group m-form__group row">
                                                <label htmlFor="example-text-input" className="col-2 col-form-label">Tên Tài Khoản</label>
                                                <div className="col-10">
                                                    <input className="form-control m-input" type="text" value={SetUser.getUser().name} />
                                                </div>
                                            </div>
                                            <div className="form-group m-form__group row">
                                                <label htmlFor="example-text-input" className="col-2 col-form-label">Occupation</label>
                                                <div className="col-10">
                                                    <input className="form-control m-input" type="text" defaultValue="CTO" />
                                                </div>
                                            </div>
                                            <div className="form-group m-form__group row">
                                                <label htmlFor="example-text-input" className="col-2 col-form-label">Company Name</label>
                                                <div className="col-10">
                                                    <input className="form-control m-input" type="text" defaultValue="Keenthemes" />
                                                    <span className="m-form__help">If you want your invoices addressed to a company. Leave blank to use your full name.</span>
                                                </div>
                                            </div>
                                            <div className="form-group m-form__group row">
                                                <label htmlFor="example-text-input" className="col-2 col-form-label">Phone No.</label>
                                                <div className="col-10">
                                                    <input className="form-control m-input" type="text" defaultValue={+456669067890} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="m-card-profile">
                                                <div className="m-card-profile__title m--hide">
                                                    Your Profile
                                                </div>
                                                <div className="m-card-profile__pic">
                                                    <div className="m-card-profile__pic-wrapper">
                                                        <img src={SetUser.getUser().image} alt="" style={{width : '100px', height : '100px', objectFit : 'cover'}} />
                                                    </div>
                                                </div>
                                                <div className="m-card-profile__details">
                                                    <span className="m-card-profile__name">{SetUser.getUser().name}</span>
                                                    <a href className="m-card-profile__email m-link">{SetUser.getUser().email}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-portlet__foot m-portlet__foot--fit">
                                    <div className="m-form__actions">
                                        <div className="row">
                                            <div className="col-2">
                                            </div>
                                            <div className="col-7">
                                                <button type="reset" className="btn btn-accent m-btn m-btn--air m-btn--custom">Save changes</button>&nbsp;&nbsp;
                                                <button type="reset" className="btn btn-secondary m-btn m-btn--air m-btn--custom">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileScreenAuth
