import Button from "../UI/Button";
import css from "./AccountInfo.module.scss";
const AccountInfo = (props) => {
    return (
        <>
            <div className={css.AccountInfo}>
                <div className={css.AccountInfo_image}>
                    <div className={css.AccountInfo_image_img}>
                        <img src="https://images.unsplash.com/photo-1630241351048-7e29a0801419?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlvbGV0JTIwcGV0YWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                        <Button text="Edit" />
                    </div>
                    <div className={css.AccountInfo_image_name}>
                        <h1>AhmedAli</h1>
                    </div>
                </div>

                <div className={css.info}>
                    <div className={css.info_card}>
                        <div className={css.info_card_info}>
                            <p>Name</p>
                            <h3>Ahmedali</h3>
                        </div>
                        <Button
                            classname={css.info_card_action}
                            text={"Edit"}
                            onClick={props.Edit}
                        />
                    </div>

                    <div className={css.info_card}>
                        <div className={css.info_card_info}>
                            <p>Email</p>
                            <h3>AhmedAli@gmail.com</h3>
                        </div>
                        <Button
                            classname={css.info_card_action}
                            text={"Edit"}
                            onClick={props.Edit}
                        />
                    </div>

                    <div className={css.info_card}>
                        <div className={css.info_card_info}>
                            <p>Password</p>
                            <h3>***********</h3>
                        </div>
                        <Button
                            classname={css.info_card_action}
                            text={"Change"}
                        />
                    </div>
                </div>
            </div>

            <Button classname={css.Signout} text={"Sign Out"} />
        </>
    );
};

export default AccountInfo;
