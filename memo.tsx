import * as Yup from "yup";

const phoneSchema = Yup.object().shape({
  phone1: Yup.string()
    .matches(/^\d{3}$/, "3桁の数字を入力してください")
    .when(["phone2", "phone3"], {
      is: (phone2, phone3) => phone2?.length > 0 || phone3?.length > 0,
      then: Yup.string().required("入力が必要です"),
      otherwise: Yup.string(),
    }),
  phone2: Yup.string()
    .matches(/^\d{4}$/, "4桁の数字を入力してください")
    .when(["phone1", "phone3"], {
      is: (phone1, phone3) => phone1?.length > 0 || phone3?.length > 0,
      then: Yup.string().required("入力が必要です"),
      otherwise: Yup.string(),
    }),
  phone3: Yup.string()
    .matches(/^\d{4}$/, "4桁の数字を入力してください")
    .when(["phone1", "phone2"], {
      is: (phone1, phone2) => phone1?.length > 0 || phone2?.length > 0,
      then: Yup.string().required("入力が必要です"),
      otherwise: Yup.string(),
    }),
});

// フォームコンポーネントの実装例
const PhoneForm = () => {
  return (
    <form>
      <div>
        <input type="text" name="phone1" maxLength={3} placeholder="000" />
        -
        <input type="text" name="phone2" maxLength={4} placeholder="0000" />
        -
        <input type="text" name="phone3" maxLength={4} placeholder="0000" />
      </div>
    </form>
  );
};
