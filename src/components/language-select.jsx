import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setSource, setTarget, swap } from "../redux/slices/translateSlice";

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { isLoading, languages } = useSelector((store) => store.language);

  const { sourceLang, targetLang } = useSelector((store) => store.translate);

  // api den gelen dizinin formatini degistir
  //language degerlerinin value ' a
  // name degerlerini label' a cevir
  const formatted =
    languages?.map((item) => ({
      value: item.language,
      label: item.name,
    })) || [];

  /*
  * api'dan gelen cevap
  const örnekLANG = [
    { language: "tr", name: "türkçe" },
    { language: "de", name: "almanca" },
  ];

  * react-select kütüphanesinin istediği ver
  const options = [
    { value: "tr", label: "türkçe" },
    { value: "de", label: "almanca" },
  ];
  */

  // dili algila ekledigimiz versiyon
  const detect = { value: undefined, label: "Detect language" };

  return (
    <div className="flex gap-2 text-black">
      <Select
        options={[detect, ...formatted]}
        className="flex-1"
        isLoading={isLoading}
        isDisabled={isLoading}
        value={sourceLang}
        onChange={(lang) => {
          if (lang.value === targetLang.value) {
            dispatch(swap());
          }
          dispatch(setSource(lang));
        }}
      />

      <button
        disabled={sourceLang.value === undefined}
        onClick={() => dispatch(swap())}
        className="bg-zinc-700 py-2 px-6 hover:bg-zinc-800 transition rounded text-white  disabled:opacity-60"
      >
        Change
      </button>

      <Select
        options={formatted}
        className="flex-1"
        isLoading={isLoading}
        isDisabled={isLoading}
        value={targetLang}
        onChange={(lang) => {
          if (lang.value === sourceLang.value) {
            dispatch(swap());
          }
          dispatch(setTarget(lang));
        }}
      />
    </div>
  );
};

export default LanguageSelect;
