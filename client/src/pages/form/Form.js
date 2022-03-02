import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

import { Internduration } from "../../constants/InternDuration";
import { btech } from "../../constants/Btech";
import { dual_mtech } from "../../constants/Dual_Mtech";
import { mbacourse } from "../../constants/Mba";
import { msc2 } from "../../constants/Msc2";
import { msc3 } from "../../constants/Msc3";
import { mtech } from "../../constants/Mtech";
import { phd } from "../../constants/Phd";
import { skill } from "../../constants/Skill";
import { testtype } from "../../constants/TypeofTest";
import { otherround } from "../../constants/OtherRounds";

import "animate.css";
import "./form.css";

export default function Form(props) {
  // console.log(props.type);
  const notify = () => {
    toast.success("The data is being saved", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [prevData, setPrevData] = useState({
    user_id: "",
    type: "",
    company_overview: {
      name: "",
      website: "",
      sector: "",
    },
    job_detail: {
      designation: "",
      place_of_posting: "",
      description: "",
      duration: [],
      mode: "",
    },
    stipend_detail: {
      ctc: "",
      ctc_breakup: "",
      bond_detail: "",
      stipend: "",
      ppo_provision: "",
      ctc_ppo: "",
    },
    contact_detail: [
      {
        name: "",
        designation: "",
        email: "",
        mobile: "",
      },
    ],
    eligible_branch: {
      btech: [],
      dd_mtech: [],
      msc2: [],
      msc3: [],
      mtech: [],
      mba: [],
      phd: [],
    },
    skill_based: [],
    selection_pr: {
      resume_short_listing: "",
      type_of_test: "",
      other_round: [],
      total_rounds: 0,
      no_of_offers: "",
      eligible_criteria: "",
    },
    doc_link: "",
    DateTime: "",
    pdf_id: "",
    pdf_link: "",
  });
  const { obj_id } = useParams();
  const [allData, setAllData] = useState({});
  const [companyoverview, setCompanyoverview] = useState(false);
  const [jobdetail, setJobdetail] = useState(false);
  const [contact, setContact] = useState(false);
  const [stipenddetail, setStipenddetail] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [durationdiv, setdurationdiv] = useState(false);
  const [btechdiv, setBtechdiv] = useState(false);
  const [dual_mtechdiv, setdual_mtechdiv] = useState(false);
  const [mbadiv, setmbadiv] = useState(false);
  const [msc2div, setmsc2div] = useState(false);
  const [msc3div, setmsc3div] = useState(false);
  const [mtechdiv, setmtechdiv] = useState(false);
  const [phddiv, setphddiv] = useState(false);
  const [skilldiv, setskilldiv] = useState(false);
  const [selectiondiv, setselectiondiv] = useState(false);
  const [typeoftestdiv, settypeoftestdiv] = useState(false);
  const [otherrounddiv, setotherrounddiv] = useState(false);

  const [secondarycontact, setSecondarycontact] = useState();

  const [modebutton, setModebutton] = useState(prevData.job_detail.mode);
  const [ppo, setPpo] = useState(prevData.stipend_detail.ppo_provision);

  const [name, setname] = useState(prevData.company_overview.name);
  const [website, setwebsite] = useState(prevData.company_overview.website);
  const [sector, setsector] = useState(prevData.company_overview.sector);
  const [designation, setDesignation] = useState(
    prevData.job_detail.designation
  );
  const [place_of_posting, setplace_of_posting] = useState(
    prevData.job_detail.place_of_posting
  );
  const [description, setdescription] = useState(
    prevData.job_detail.description
  );
  const [duration, setduration] = useState(prevData.job_detail.duration);
  const [mode, setmode] = useState("");
  const [ctc, setctc] = useState(prevData.stipend_detail.ctc);
  const [ctc_breakup, setctc_breakup] = useState(
    prevData.stipend_detail.ctc_breakup
  );
  const [bond_detail, setbond_detail] = useState(
    prevData.stipend_detail.bond_detail
  );
  const [stipend, setstipend] = useState(prevData.stipend_detail.stipend);
  const [ppo_provision, setppo_provision] = useState("");
  const [ctc_ppo, setctc_ppo] = useState(prevData.stipend_detail.ctc_ppo);
  const [contactname1, setcontactname1] = useState(
    prevData.contact_detail[0].name
  );
  const [contactdesignation1, setcontactdesignation1] = useState(
    prevData.contact_detail[0].designation
  );
  const [contactemail1, setcontactemail1] = useState(
    prevData.contact_detail[0].email
  );
  const [mobile1, setmobile1] = useState(prevData.contact_detail[0].mobile);
  const [contactname2, setcontactname2] = useState("");
  const [contactdesignation2, setcontactdesignation2] = useState("");
  const [contactemail2, setcontactemail2] = useState("");
  const [mobile2, setmobile2] = useState("");
  const [otherskill, setotherskill] = useState("");
  const [resumeshort, setresumeshort] = useState(
    prevData.selection_pr.resume_short_listing
  );
  const [typeoftest, settypeoftest] = useState(
    prevData.selection_pr.type_of_test
  );
  const [total_rounds, settotal_rounds] = useState(
    prevData.selection_pr.total_rounds
  );
  const [no_of_offers, setno_of_offers] = useState(
    prevData.selection_pr.no_of_offers
  );
  const [eligible_criteria, seteligible_criteria] = useState(
    prevData.selection_pr.eligible_criteria
  );

  const [btecharray, setbtecharray] = useState(prevData.eligible_branch.btech);
  const [dual_mtecharray, setdual_mtecharray] = useState(
    prevData.eligible_branch.dd_mtech
  );
  const [mbaarray, setmbaarray] = useState(prevData.eligible_branch.mba);
  const [msc2array, setmsc2array] = useState(prevData.eligible_branch.msc2);
  const [msc3array, setmsc3array] = useState(prevData.eligible_branch.msc3);
  const [mtecharray, setmtecharray] = useState(prevData.eligible_branch.mtech);
  const [phdarray, setphdarray] = useState(prevData.eligible_branch.phd);
  const [skillarray, setskillarray] = useState(prevData.skill_based);
  const [other_roundarray, setother_roundarray] = useState(
    prevData.selection_pr.other_round
  );
  const [contactdetail, setcontactdetail] = useState([]);
  // setotherskill(() => {
  //   for (var i = 0; i < skillarray.length; i++) {
  //     if (skill.includes(skillarray[i]) === false) {
  //       return skillarray[i];
  //     }
  //     return "";
  //   }
  // });
  function findotherskill() {
    for (var i = 0; i < skillarray.length; i++) {
      if (skill.includes(skillarray[i]) === false) {
        setotherskill(skillarray[i]);
        return skillarray[i];
      }
      return "";
    }
  }
  function findsecondarycontact() {
    if (prevData.contact_detail.length === 2) {
      setSecondarycontact(() => "Yes");
      setcontactname2(() => prevData.contact_detail[1].name);
      setcontactdesignation2(() => prevData.contact_detail[1].designation);
      setcontactemail2(() => prevData.contact_detail[1].email);
      setmobile2(() => prevData.contact_detail[1].mobile);
    }
  }
  function handleChangeDuration(e) {
    var updatedList = [...duration];
    if (e.target.checked) {
      updatedList = [...duration, e.target.value];
    } else {
      updatedList = duration.filter((item) => item !== e.target.value);
    }
    setduration(() => updatedList);
  }
  function handleChangeBtech(e) {
    var updatedList = [...btecharray];
    if (e.target.checked) {
      updatedList = [...btecharray, e.target.value];
    } else {
      updatedList = btecharray.filter((item) => item !== e.target.value);
    }
    setbtecharray(() => updatedList);
  }
  function handleChangedual_mtech(e) {
    var updatedList = [...dual_mtecharray];
    if (e.target.checked) {
      updatedList = [...dual_mtecharray, e.target.value];
    } else {
      updatedList = dual_mtecharray.filter((item) => item !== e.target.value);
    }
    setdual_mtecharray(() => updatedList);
  }
  function handleChangemba(e) {
    var updatedList = [...mbaarray];
    if (e.target.checked) {
      updatedList = [...mbaarray, e.target.value];
    } else {
      updatedList = mbaarray.filter((item) => item !== e.target.value);
    }
    setmbaarray(() => updatedList);
  }
  function handleChangemsc2(e) {
    var updatedList = [...msc2array];
    if (e.target.checked) {
      updatedList = [...msc2array, e.target.value];
    } else {
      updatedList = msc2array.filter((item) => item !== e.target.value);
    }
    setmsc2array(() => updatedList);
  }
  function handleChangemsc3(e) {
    var updatedList = [...msc3array];
    if (e.target.checked) {
      updatedList = [...msc3array, e.target.value];
    } else {
      updatedList = msc3array.filter((item) => item !== e.target.value);
    }
    setmsc3array(() => updatedList);
  }
  function handleChangemtech(e) {
    var updatedList = [...mtecharray];
    if (e.target.checked) {
      updatedList = [...mtecharray, e.target.value];
    } else {
      updatedList = mtecharray.filter((item) => item !== e.target.value);
    }
    setmtecharray(() => updatedList);
  }
  function handleChangephd(e) {
    var updatedList = [...phdarray];
    if (e.target.checked) {
      updatedList = [...phdarray, e.target.value];
    } else {
      updatedList = phdarray.filter((item) => item !== e.target.value);
    }
    setphdarray(() => updatedList);
  }
  function handleChangeSkill(e) {
    var updatedList = [...skillarray];
    if (e.target.checked) {
      updatedList = [...skillarray, e.target.value];
    } else {
      updatedList = skillarray.filter((item) => item !== e.target.value);
    }
    setskillarray(() => updatedList);
  }
  function handleChangeOtherRound(e) {
    var updatedList = [...other_roundarray];
    if (e.target.checked) {
      updatedList = [...other_roundarray, e.target.value];
    } else {
      updatedList = other_roundarray.filter((item) => item !== e.target.value);
    }
    setother_roundarray(() => updatedList);
  }
  async function handleSubmit(e) {
    const date = new Date();
    const type = props.type;
    const company_overview = {
      name: name,
      website: website,
      sector: sector,
    };
    const job_detail = {
      designation: designation,
      place_of_posting: place_of_posting,
      description: description,
      duration: duration,
      mode: mode,
    };
    const stipend_detail = {
      ctc: ctc,
      ctc_breakup: ctc_breakup,
      bond_detail: bond_detail,
      stipend: stipend,
      ppo_provision: ppo_provision,
      ctc_ppo: ctc_ppo,
    };
    const eligible_branch = {
      btech: btecharray,
      dd_mtech: dual_mtecharray,
      msc2: msc2array,
      msc3: msc3array,
      mtech: mtecharray,
      mba: mbaarray,
      phd: phdarray,
    };
    if (otherskill !== "") {
      var newarray = skillarray;
      newarray.push(otherskill);
      setskillarray(() => newarray);
    }
    const skill_based = skillarray;
    const selection_pr = {
      resume_short_listing: resumeshort,
      type_of_test: typeoftest,
      other_round: other_roundarray,
      total_rounds: total_rounds,
      no_of_offers: no_of_offers,
      eligible_criteria: eligible_criteria,
    };

    var tempcontact = [
      {
        name: contactname1,
        designation: contactdesignation1,
        email: contactemail1,
        mobile: mobile1,
      },
    ];
    setcontactdetail(() => tempcontact);
    if (secondarycontact === "Yes") {
      var temp = {
        name: contactname2,
        designation: contactdesignation2,
        email: contactemail2,
        mobile: mobile2,
      };
      tempcontact.push(temp);
      setcontactdetail(() => tempcontact);
    }
    const contact_detail = contactdetail;

    let formData = {
      type: props.type,
      company_overview: company_overview,
      job_detail: job_detail,
      stipend_detail: stipend_detail,
      contact_detail: contactdetail,
      eligible_branch: eligible_branch,
      skill_based: skill_based,
      selection_pr: selection_pr,
      doc_link: "",
      DateTime: date,
      pdf_id: "",
      pdf_viewlink: "",
      pdf_downloadlink: "",
    };
    const response = await axios.post(
      "http://localhost:3000/pdf/uploadToDrive",
      formData
    );
    formData.pdf_viewlink = response.data.url.webViewLink;
    formData.pdf_downloadlink = response.data.url.webContentLink;
    formData.pdf_id = response.data.pdf_id;
    const result = await axios.post(
      "http://localhost:3000/form/save",
      formData
    );
    // console.log(response.data, result);
  }
  useEffect(() => {
    // console.log(obj_id);
    findotherskill();
    findsecondarycontact();
    async function fetchPrevData() {
      // const url = "localhost:3000/getpreviousdata";
      // const response = await axios.post(url, obj_id);
      // setPrevData(() => response);
      // const response2 = await axios.get("localhost:3000/getAll");
      // console.log(response2);
      // setAllData(() => response2);
    }
    fetchPrevData();
    // prevData.eligible_branch.btech;
  }, []);
  return (
    <>
      <div>
        <div>
          {props.type === "INF" ? (
            <div className="formHeader text-center">
              Internship Notification Form
              <hr />
              <span>Fill the below details to submit an INF to CDC</span>
            </div>
          ) : (
            <div className="formHeader text-center">
              Job Notification Form
              <hr />
              <span>Fill the below details to submit a JNF to CDC</span>
            </div>
          )}
        </div>
        {/* COMPANY OVERVIEW */}
        <div className="animate__animated animate__fadeInLeft container col-lg-8 col-md-12 category p-0 ">
          <div
            className="upper"
            onClick={() => {
              setTimeout(() => {
                if (companyoverview) {
                  setCompanyoverview(false);
                } else {
                  setCompanyoverview(true);
                }
              }, 200);
            }}
          >
            <div className="category-heading">
              <h3>COMPANY OVERVIEW</h3>
              <div className="mx-4">
                {companyoverview === true ? (
                  <FaAngleDoubleUp />
                ) : (
                  <FaAngleDoubleDown />
                )}
              </div>
            </div>
          </div>
          {companyoverview === true ? (
            <div className="lower">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setname(() => e.target.value)}
                  value={name}
                />
                <label for="floatingInput">Name of Company</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Website"
                  onChange={(e) => setwebsite(() => e.target.value)}
                  value={website}
                />
                <label for="floatingInput">Website</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sector"
                  onChange={(e) => setsector(() => e.target.value)}
                  value={sector}
                />
                <label for="floatingInput">Sector</label>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/* JOB DETAILS */}
        <div className="animate__animated animate__fadeInRight container col-lg-8 col-md-12 category p-0 ">
          <div
            className="upper"
            onClick={() => {
              setTimeout(() => {
                if (jobdetail) {
                  setJobdetail(false);
                } else {
                  setJobdetail(true);
                }
              }, 200);
            }}
          >
            <div className="category-heading">
              {props.type === "INF" ? (
                <h3>INTERNSHIP DETAILS</h3>
              ) : (
                <h3>JOB DETAILS</h3>
              )}
              <div className="mx-4">
                {jobdetail === true ? (
                  <FaAngleDoubleUp />
                ) : (
                  <FaAngleDoubleDown />
                )}
              </div>
            </div>
          </div>
          {jobdetail === true ? (
            <div className="lower">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  onChange={(e) => setDesignation(() => e.target.value)}
                  value={designation}
                />
                <label for="floatingInput">Designation</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Place"
                  onChange={(e) => setplace_of_posting(() => e.target.value)}
                  value={place_of_posting}
                />
                <label for="floatingInput">Place of Posting</label>
              </div>
              <div className="form-floating mb-3 ">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  onChange={(e) => setdescription(() => e.target.value)}
                  value={description}
                ></textarea>
                <label>Description</label>
              </div>

              {props.type === "INF" ? (
                <div className="form-floating optionbox mb-3 ">
                  <div className="optionbox-title pt-1">Mode of Intern: </div>
                  {/* {setModebutton(() => prevData.job_detail.mode)} */}
                  <div>
                    <button
                      type="button"
                      className={
                        "optionbutton btn " +
                        (modebutton === "Virtual" ? "btn-primary" : "")
                      }
                      onClick={() => {
                        setModebutton("Virtual");
                        setmode(() => "Virtual");
                      }}
                    >
                      Virtual
                    </button>
                    <button
                      type="button "
                      className={
                        "optionbutton btn " +
                        (modebutton === "Physical" ? "btn-primary" : "")
                      }
                      onClick={() => {
                        setModebutton("Physical");
                        setmode(() => "Physical");
                      }}
                    >
                      Physical
                    </button>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {props.type === "INF" ? (
                <div className="eligible-type mb-3 ">
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        if (durationdiv) {
                          setdurationdiv(false);
                        } else {
                          setdurationdiv(true);
                        }
                      }, 200);
                    }}
                  >
                    <div className="eligible-heading d-flex justify-content-between">
                      <h3>Internship Duration</h3>
                      {durationdiv === true ? (
                        <FaAngleDoubleUp />
                      ) : (
                        <FaAngleDoubleDown />
                      )}
                    </div>
                  </div>
                  {durationdiv ? (
                    <div className="eligible-options m-2 p-2">
                      {Internduration.map((item) => {
                        return (
                          <div className="m-3 ">
                            <label className="container form-check">
                              {item}
                              <input
                                type="checkbox"
                                value={item}
                                checked={duration.includes(item)}
                                onChange={(e) => handleChangeDuration(e)}
                              />
                              <span className="checkmark "></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/* STIPEND DETAILS */}
        <div className="animate__animated animate__fadeInLeft container col-lg-8 col-md-12 category p-0 ">
          <div
            className="upper"
            onClick={() => {
              setTimeout(() => {
                if (stipenddetail) {
                  setStipenddetail(false);
                } else {
                  setStipenddetail(true);
                }
              }, 200);
            }}
          >
            <div className="category-heading">
              <h3>
                {props.type === "INF" ? "STIPEND DETAILS" : "SALARY DETAILS"}
              </h3>
              <div className="mx-4">
                {stipenddetail === true ? (
                  <FaAngleDoubleUp />
                ) : (
                  <FaAngleDoubleDown />
                )}
              </div>
            </div>
          </div>
          {stipenddetail === true ? (
            <div className="lower">
              {props.type === "JNF" ? (
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ctc"
                      onChange={(e) => setctc(() => e.target.value)}
                      value={ctc}
                    />
                    <label for="floatingInput">CTC</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ctcbreakup"
                      onChange={(e) => setctc_breakup(() => e.target.value)}
                      value={ctc_breakup}
                    />
                    <label for="floatingInput">CTC breakup</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="bond detail"
                      style={{ height: 100 }}
                      onChange={(e) => setbond_detail(() => e.target.value)}
                      value={bond_detail}
                    ></textarea>
                    <label>Bond Detail</label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="stipend"
                      onChange={(e) => setstipend(() => e.target.value)}
                      value={stipend}
                    />
                    <label for="floatingInput">Stipend(Per Month)</label>
                  </div>

                  <div className="form-floating optionbox  mb-3">
                    <div className="optionbox-title pt-1">PPO Provision: </div>
                    <div>
                      <button
                        type="button"
                        className={
                          "optionbutton btn " +
                          (ppo === "Yes" ? "btn-primary" : "")
                        }
                        onClick={() => {
                          setPpo(() => "Yes");
                          setppo_provision(() => "Yes");
                        }}
                      >
                        Yes
                      </button>
                      <button
                        type="button "
                        className={
                          "optionbutton btn " +
                          (ppo === "No" ? "btn-primary" : "")
                        }
                        onClick={() => {
                          setPpo(() => "No");
                          setppo_provision(() => "No");
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  {ppo === "Yes" ? (
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ctc if provided"
                        onChange={(e) => setctc_ppo(() => e.target.value)}
                        value={ctc_ppo}
                      />
                      <label for="floatingInput">
                        CTC details, if PPO is provided{" "}
                      </label>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/* Contact Detail */}
        <div className="animate__animated animate__fadeInRight container col-lg-8 col-md-12 category p-0 ">
          {/* {findsecondarycontact()} */}
          <div
            className="upper"
            onClick={() => {
              setTimeout(() => {
                if (contact) {
                  setContact(false);
                } else {
                  setContact(true);
                }
              }, 200);
            }}
          >
            <div className="category-heading">
              <h3>CONTACT DETAILS</h3>
              <div className="mx-4">
                {contact === true ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
              </div>
            </div>
          </div>
          {contact === true ? (
            <div className="lower">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  onChange={(e) => setcontactname1(() => e.target.value)}
                  value={contactname1}
                />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="designation"
                  onChange={(e) => setcontactdesignation1(() => e.target.value)}
                  value={contactdesignation1}
                />
                <label for="floatingInput">Designation</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  onChange={(e) => setcontactemail1(() => e.target.value)}
                  value={contactemail1}
                />
                <label for="floatingInput">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="mobile"
                  onChange={(e) => setmobile1(() => e.target.value)}
                  value={mobile1}
                />
                <label for="floatingInput">Mobile</label>
              </div>

              <div className="mb-3 form-floating optionbox">
                <div className="optionbox-title pt-1">
                  Add Secondary Contact Details:{" "}
                </div>

                <div>
                  <button
                    type="button"
                    className={
                      "optionbutton btn " +
                      (secondarycontact === "Yes" ? "btn-primary" : "")
                    }
                    onClick={() => setSecondarycontact("Yes")}
                  >
                    Yes
                  </button>
                  <button
                    type="button "
                    className={
                      "optionbutton btn " +
                      (secondarycontact === "No" ? "btn-primary" : "")
                    }
                    onClick={() => setSecondarycontact("No")}
                  >
                    No
                  </button>
                </div>
              </div>
              {secondarycontact === "Yes" ? (
                <div>
                  <h3 className="mx-1 my-2">Secondary Contact:</h3>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name"
                      value={contactname2}
                      onChange={(e) => setcontactname2(() => e.target.value)}
                    />
                    <label for="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="designation"
                      value={contactdesignation2}
                      onChange={(e) =>
                        setcontactdesignation2(() => e.target.value)
                      }
                    />
                    <label for="floatingInput">Designation</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={contactemail2}
                      onChange={(e) => setcontactemail2(() => e.target.value)}
                    />
                    <label for="floatingInput">Email address</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="mobile"
                      value={mobile2}
                      onChange={(e) => setmobile2(() => e.target.value)}
                    />
                    <label for="floatingInput">Mobile</label>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/* Eligible Courses */}
        <div className="animate__animated animate__fadeInLeft container col-lg-8 col-md-12 category p-0 ">
          <div
            className="upper"
            onClick={() => {
              setTimeout(() => {
                if (eligible) {
                  setEligible(false);
                } else {
                  setEligible(true);
                }
              }, 200);
            }}
          >
            <div className="category-heading">
              <h3>Eligible courses and disipline</h3>
              <div className="mx-4">
                {eligible === true ? (
                  <FaAngleDoubleUp />
                ) : (
                  <FaAngleDoubleDown />
                )}
              </div>
            </div>
          </div>
          {eligible === true ? (
            <div className="lower">
              <div>
                <div className="eligible-type">
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        if (btechdiv) {
                          setBtechdiv(false);
                        } else {
                          setBtechdiv(true);
                        }
                      }, 200);
                    }}
                  >
                    <div className="eligible-heading d-flex justify-content-between">
                      <h3>4-Year B.Tech Programs</h3>
                      {btechdiv === true ? (
                        <FaAngleDoubleUp />
                      ) : (
                        <FaAngleDoubleDown />
                      )}
                    </div>

                    <div className="eligible-sub-heading">
                      <p className="m-0">Admitted through JEE (Advanced)</p>
                    </div>
                  </div>
                  {btechdiv ? (
                    <div className="eligible-options m-2 p-2">
                      {btech.map((item) => {
                        return (
                          <div className="m-3 ">
                            <label className="container form-check">
                              {item}
                              <input
                                type="checkbox"
                                value={item}
                                checked={btecharray.includes(item)}
                                onChange={(e) => handleChangeBtech(e)}
                              />
                              <span className="checkmark "></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="eligible-type my-2">
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        if (dual_mtechdiv) {
                          setdual_mtechdiv(false);
                        } else {
                          setdual_mtechdiv(true);
                        }
                      }, 200);
                    }}
                  >
                    <div className="eligible-heading d-flex justify-content-between">
                      <h3> 5-Year Dual Degree/ Integrated M.Tech Programs</h3>
                      {dual_mtechdiv === true ? (
                        <FaAngleDoubleUp />
                      ) : (
                        <FaAngleDoubleDown />
                      )}
                    </div>

                    <div className="eligible-sub-heading">
                      <p className="m-0">Admitted through JEE (Advanced)</p>
                    </div>
                  </div>
                  {dual_mtechdiv ? (
                    <div className="eligible-options m-2 p-2">
                      {dual_mtech.map((item) => {
                        return (
                          <div className="m-3 ">
                            <label className="container form-check">
                              {item}
                              <input
                                type="checkbox"
                                value={item}
                                onChange={(e) => handleChangedual_mtech(e)}
                                checked={dual_mtecharray.includes(item)}
                              />
                              <span className="checkmark "></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div className="eligible-type my-2">
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        if (msc3div) {
                          setmsc3div(false);
                        } else {
                          setmsc3div(true);
                        }
                      }, 200);
                    }}
                  >
                    <div className="eligible-heading d-flex justify-content-between">
                      <h3> 3-Year MSc. Tech Programs</h3>
                      {msc3div === true ? (
                        <FaAngleDoubleUp />
                      ) : (
                        <FaAngleDoubleDown />
                      )}
                    </div>

                    <div className="eligible-sub-heading">
                      <p className="m-0">Admitted through JAM</p>
                    </div>
                  </div>
                  {msc3div ? (
                    <div className="eligible-options m-2 p-2">
                      {msc3.map((item) => {
                        return (
                          <div className="m-3 ">
                            <label className="container form-check">
                              {item}
                              <input
                                type="checkbox"
                                value={item}
                                checked={msc3array.includes(item)}
                                onChange={(e) => handleChangemsc3(e)}
                              />
                              <span className="checkmark "></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="eligible-type my-2">
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        if (msc2div) {
                          setmsc2div(false);
                        } else {
                          setmsc2div(true);
                        }
                      }, 200);
                    }}
                  >
                    <div className="eligible-heading d-flex justify-content-between">
                      <h3> 2-Year MSc. Tech Programs</h3>
                      {msc2div === true ? (
                        <FaAngleDoubleUp />
                      ) : (
                        <FaAngleDoubleDown />
                      )}
                    </div>

                    <div className="eligible-sub-heading">
                      <p className="m-0">Admitted through GATE</p>
                    </div>
                  </div>
                  {msc2div ? (
                    <div className="eligible-options m-2 p-2">
                      {msc2.map((item) => {
                        return (
                          <div className="m-3 ">
                            <label className="container form-check">
                              {item}
                              <input
                                type="checkbox"
                                value={item}
                                checked={msc2array.includes(item)}
                                onChange={(e) => handleChangemsc2(e)}
                              />
                              <span className="checkmark "></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="eligible-type my-2">
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        if (mbadiv) {
                          setmbadiv(false);
                        } else {
                          setmbadiv(true);
                        }
                      }, 200);
                    }}
                  >
                    <div className="eligible-heading d-flex justify-content-between">
                      <h3> 2-Year MBA Programs</h3>
                      {mbadiv === true ? (
                        <FaAngleDoubleUp />
                      ) : (
                        <FaAngleDoubleDown />
                      )}
                    </div>

                    <div className="eligible-sub-heading">
                      <p className="m-0">Admitted through CAT</p>
                    </div>
                  </div>
                  {mbadiv ? (
                    <div className="eligible-options m-2 p-2">
                      {mbacourse.map((item) => {
                        return (
                          <div className="m-3 ">
                            <label className="container form-check">
                              {item}
                              <input
                                type="checkbox"
                                value={item}
                                checked={mbaarray.includes(item)}
                                onChange={(e) => handleChangemba(e)}
                              />
                              <span className="checkmark "></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="eligible-type my-2">
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        if (mtechdiv) {
                          setmtechdiv(false);
                        } else {
                          setmtechdiv(true);
                        }
                      }, 200);
                    }}
                  >
                    <div className="eligible-heading d-flex justify-content-between">
                      <h3> 2-Year M.Tech Programs</h3>
                      {mtechdiv === true ? (
                        <FaAngleDoubleUp />
                      ) : (
                        <FaAngleDoubleDown />
                      )}
                    </div>

                    <div className="eligible-sub-heading">
                      <p className="m-0">Admitted through GATE</p>
                    </div>
                  </div>
                  {mtechdiv ? (
                    <div className="eligible-options m-2 p-2">
                      {mtech.map((item) => {
                        return (
                          <div className="m-3 ">
                            <label className="container form-check">
                              {item}
                              <input
                                type="checkbox"
                                value={item}
                                checked={mtecharray.includes(item)}
                                onChange={(e) => handleChangemtech(e)}
                              />
                              <span className="checkmark "></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="eligible-type my-2">
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        if (phddiv) {
                          setphddiv(false);
                        } else {
                          setphddiv(true);
                        }
                      }, 200);
                    }}
                  >
                    <div className="eligible-heading d-flex justify-content-between">
                      <h3> PhD Programs</h3>
                      {phddiv === true ? (
                        <FaAngleDoubleUp />
                      ) : (
                        <FaAngleDoubleDown />
                      )}
                    </div>

                    <div className="eligible-sub-heading">
                      <p className="m-0">Admitted through GATE/NET</p>
                    </div>
                  </div>
                  {phddiv ? (
                    <div className="eligible-options m-2 p-2">
                      {phd.map((item) => {
                        return (
                          <div className="m-3 ">
                            <label className="container form-check">
                              {item}
                              <input
                                type="checkbox"
                                value={item}
                                checked={phdarray.includes(item)}
                                onChange={(e) => handleChangephd(e)}
                              />
                              <span className="checkmark "></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/* Skill based hiring */}
        <div className="animate__animated animate__fadeInRight container col-lg-8 col-md-12 category p-0 ">
          <div
            className="upper"
            onClick={() => {
              setTimeout(() => {
                if (skilldiv) {
                  setskilldiv(false);
                } else {
                  setskilldiv(true);
                }
              }, 200);
            }}
          >
            <div className="category-heading">
              <h3>SKILL BASED HIRING</h3>
              <div className="mx-4">
                {skilldiv === true ? (
                  <FaAngleDoubleUp />
                ) : (
                  <FaAngleDoubleDown />
                )}
              </div>
            </div>
            {skilldiv ? (
              <p style={{ fontSize: "13px" }}>
                Students with certified technical expertise in the following
                skills (from Coursera, Udemy etc.)
              </p>
            ) : (
              <div></div>
            )}
          </div>
          {skilldiv === true ? (
            <div className="lower">
              {skilldiv ? (
                <div className="eligible-type my-2">
                  <div className="eligible-options p-2">
                    {skill.map((item) => {
                      return (
                        <div className="m-2 ">
                          <label className="container form-check">
                            {item}
                            <input
                              type="checkbox"
                              value={item}
                              checked={skillarray.includes(item)}
                              onChange={(e) => handleChangeSkill(e)}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      );
                    })}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="other skill"
                        value={otherskill}
                        onChange={(e) => setotherskill(() => e.target.value)}
                      />
                      <label for="floatingInput">
                        Other Skills (Please specify)
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/* Selection Procedure */}
        <div className="animate__animated animate__fadeInLeft container col-lg-8 col-md-12 category p-0 ">
          <div
            className="upper"
            onClick={() => {
              setTimeout(() => {
                if (selectiondiv) {
                  setselectiondiv(false);
                } else {
                  setselectiondiv(true);
                }
              }, 200);
            }}
          >
            <div className="category-heading">
              <h3>SELECTION PROCEDURE</h3>

              <div className="mx-4">
                {selectiondiv === true ? (
                  <FaAngleDoubleUp />
                ) : (
                  <FaAngleDoubleDown />
                )}
              </div>
            </div>
          </div>
          {selectiondiv === true ? (
            <div className="lower">
              {selectiondiv ? (
                <div>
                  <div className="mb-3 optionbox">
                    <div className="optionbox-title">
                      <h3>Resume Shortlisting:</h3>{" "}
                    </div>
                    <div>
                      <button
                        type="button"
                        className={
                          "optionbutton btn " +
                          (resumeshort === "Yes" ? "btn-primary" : "")
                        }
                        onClick={() => setresumeshort(() => "Yes")}
                      >
                        Yes
                      </button>
                      <button
                        type="button "
                        className={
                          "optionbutton btn " +
                          (resumeshort === "No" ? "btn-primary" : "")
                        }
                        onClick={() => setresumeshort("No")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div className="eligible-type">
                    <div
                      onClick={() => {
                        setTimeout(() => {
                          if (typeoftestdiv) {
                            settypeoftestdiv(false);
                          } else {
                            settypeoftestdiv(true);
                          }
                        }, 200);
                      }}
                    >
                      <div className="eligible-heading d-flex justify-content-between">
                        <h3>Type of Test</h3>
                        {typeoftestdiv === true ? (
                          <FaAngleDoubleUp />
                        ) : (
                          <FaAngleDoubleDown />
                        )}
                      </div>
                    </div>
                    {typeoftestdiv ? (
                      <div className="eligible-options m-2 p-2">
                        {testtype.map((item) => {
                          // console.log(typeoftest);
                          return (
                            <div className="m-3 ">
                              <label className="container form-check">
                                {item}
                                <input
                                  type="checkbox"
                                  checked={typeoftest === item ? true : false}
                                  value={item}
                                  onClick={(e) => {
                                    if (e.target.value === typeoftest) {
                                      settypeoftest(() => "");
                                    } else {
                                      settypeoftest(() => e.target.value);
                                    }
                                  }}
                                />
                                <span className="checkmark "></span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="eligible-type my-2">
                    <div
                      onClick={() => {
                        setTimeout(() => {
                          if (otherrounddiv) {
                            setotherrounddiv(false);
                          } else {
                            setotherrounddiv(true);
                          }
                        }, 200);
                      }}
                    >
                      <div className="eligible-heading d-flex justify-content-between">
                        <h3>Other Qualification Rounds</h3>
                        {otherrounddiv === true ? (
                          <FaAngleDoubleUp />
                        ) : (
                          <FaAngleDoubleDown />
                        )}
                      </div>
                    </div>
                    {otherrounddiv ? (
                      <div className="eligible-options m-2 p-2">
                        {otherround.map((item) => {
                          return (
                            <div className="m-3 ">
                              <label className="container form-check">
                                {item}
                                <input
                                  type="checkbox"
                                  value={item}
                                  checked={other_roundarray.includes(item)}
                                  onChange={(e) => handleChangeOtherRound(e)}
                                />
                                <span className="checkmark "></span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="mb-3 optionbox">
                    <div className="optionbox-title pt-3 pb-0">
                      <h3>Total number of rounds </h3>
                    </div>
                    <div>
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Total Rounds"
                          value={total_rounds}
                          onChange={(e) =>
                            settotal_rounds(() => e.target.value)
                          }
                        />
                        {/* <label for="floatingInput">Total number of rounds</label> */}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 optionbox">
                    <div
                      className="optionbox-title p-0"
                      style={{ width: "60%" }}
                    >
                      <div>
                        <h3>
                          Number of offers available for IIT(ISM) students{" "}
                        </h3>
                      </div>
                      <div>
                        <p>(Range would be sufficient)</p>
                      </div>
                    </div>
                    <div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Number of offers"
                          value={no_of_offers}
                          onChange={(e) =>
                            setno_of_offers(() => e.target.value)
                          }
                        />
                        {/* <label for="floatingInput">Total number of rounds</label> */}
                      </div>
                    </div>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Eligibility Criteria"
                      value={eligible_criteria}
                      onChange={(e) =>
                        seteligible_criteria(() => e.target.value)
                      }
                    />
                    <label for="floatingInput">
                      Eligibilty Criteria (if any)
                    </label>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="d-flex justify-content-center m-3">
          <Button
            onClick={(e) => {
              handleSubmit(e);
              notify();
            }}
            variant="outline-primary mx-4"
          >
            Submit
          </Button>{" "}
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </>
  );
}
