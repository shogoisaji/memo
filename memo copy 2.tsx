memo copy.tsxexport type VisitForm = {
  visitId: string;
  applyDate: string;
};

export type ExaminationSettingsForm = {
  baseDate: string;
  visitFormValues: VisitForm[];
};

export interface ApiU2SubjectsSubjectIdVisitsGetVisit {
    /**
     *
     * @type {string}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'visit_id': string;
    /**
     *
     * @type {string}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'visit_name': string;
    /**
     *
     * @type {number}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'visit_type': number;
    /**
     *
     * @type {number}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'period': number;
    /**
     *
     * @type {number}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'allowance_before': number;
    /**
     *
     * @type {number}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'allowance_after': number;
    /**
     *
     * @type {number}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'is_allowance': number;
    /**
     *
     * @type {string}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'applicable_date': string;
    /**
     *
     * @type {number}
     

type Visits = {
  visits: ApiU2SubjectsSubjectIdVisitsGetVisit[];
  isSearch: boolean;
  baseDate: Date | null;
};
* @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'icon': number;
    /**
     *
     * @type {string}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'status': string | null;
    /**
     *
     * @type {Array<ScheduleIcon>}
     * @memberof ApiU2SubjectsSubjectIdVisitsGetVisit
     */
    'schedule_icons': Array<ScheduleIcon> | null;
}

