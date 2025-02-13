-- 例: trn_send_disaster_visitテーブルへのデータ挿入
INSERT INTO trn_send_disaster_visit (
    send_disaster_visit_id,
    questionnaire_id,
    status,
    created_datetime,
    updated_datetime
) VALUES (
    :new_send_disaster_visit_id,
    :target_questionnaire_id,
    :delivery_status_completed,
    NOW(),
    NOW()
);

-- 例: trn_subject_questionnaire_statusテーブルへのデータ挿入
INSERT INTO trn_subject_questionnaire_status (
    subject_questionnaire_id,
    generation_no,
    status,
    input_datetime
) SELECT 
    sq.subject_questionnaire_id,
    :generation_no_latest,
    :new_status,
    NOW()
FROM trn_subject_questionnaire sq
WHERE sq.questionnaire_id = :target_questionnaire_id;
