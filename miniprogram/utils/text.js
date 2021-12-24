const splitByComma = text => {
    return text
        .replace('。', '')
        .replace('！', '')
        .replace('？', '')
        .replace('、', '')
        .split("，")
}

/**
 * 统一转换为detail界面使用的数据
 * @param {} jinriData 
 */
const transJinri = jinriData => {
    return {
        "title": jinriData.origin.title,
        "dynasty": jinriData.origin.dynasty,
        "author": jinriData.origin.author,
        "content": jinriData.origin.content,
        "translate": jinriData.origin.translate,
    }
}

const transDBData = (dynasty, dbData) => {
    let title = dbData.title
    if(title == null){
        title = dbData.rhythmic
    }
    return {
        "title": title,
        "dynasty": dynasty,
        "author": dbData.author,
        "content": dbData.paragraphs,
        "translate": [],
    }
}

module.exports = {
    splitByComma: splitByComma,
    transJinri: transJinri,
    transDBData: transDBData
}