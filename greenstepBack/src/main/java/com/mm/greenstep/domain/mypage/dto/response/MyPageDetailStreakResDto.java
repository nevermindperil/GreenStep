package com.mm.greenstep.domain.mypage.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyPageDetailStreakResDto {
    private Integer weekly;
    private Integer count;
}
