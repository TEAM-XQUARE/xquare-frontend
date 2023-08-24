import styled from '@emotion/styled';
import { FlexCol, FlexRow } from '../../../common/components/Flexbox';
import PostProfile from './PostProfile';
import PostFooter from './PostFooter';
import KababButton from '../../../common/components/KababButton';
import ContentBox from '../../../common/components/ContentBox';
import { ImageCountContainer } from '../../../common/components/image';
import { sendBridgeEvent, useBridgeHandler } from '@shared/xbridge';
import { FeedType } from '../../types';
import useDeleteFeed from '../../hooks/useDeleteFeed';
interface FeedPostProps extends FeedType {
    categoryId: string;
}
//@todo props 바꾸기
const actionSheetMenu = ['삭제하기', '신고하기'] as const;

const FeedPost = ({
    attachments_url,
    name,
    comment_count,
    content,
    created_at,
    feed_id,
    is_like,
    is_mine,
    like_count,
    profile,
    authority_type,
    categoryId,
}: FeedPostProps) => {
    const { mutate: deleteMutate } = useDeleteFeed(feed_id, categoryId);
    const deleteConfirm = useBridgeHandler('confirm', (e) => e.detail.success && deleteMutate(), {
        message: '피드를 삭제하시겠습니까?',
        cancelText: '취소하기',
        confirmText: '삭제하기',
    });

    const menuAction: Record<(typeof actionSheetMenu)[number], () => void> = {
        삭제하기: () => {
            deleteConfirm();
        },
        신고하기: () => {
            sendBridgeEvent('navigate', {
                url: `/comment/${feed_id}/declare`,
                title: '신고하기',
                rightButtonText: '제출',
            });
        },
    };
    // console.log(`${type}`);
    return (
        <FlexCol fullWidth>
            <FeedPostContainer>
                <PostHeaderContainer>
                    <PostProfile
                        createAt={created_at}
                        name={`${name ? `${name}-` : ''}${authority_type}`}
                        profileSrc={profile}
                    />

                    <KababButton
                        menu={is_mine ? actionSheetMenu : ['신고하기']}
                        onClick={(menu) => menuAction[menu]()}
                    />
                </PostHeaderContainer>
                <ContentBox content={content.trim()} limit={!!attachments_url.length ? 72 : 48} />
            </FeedPostContainer>
            {!!attachments_url.length ? <ImageCountContainer images={attachments_url} /> : <></>}
            <PostFooter
                categoryId={categoryId}
                comments={comment_count}
                like={like_count}
                isMyLike={is_like}
                postId={feed_id}
            />
        </FlexCol>
    );
};

const FeedPostContainer = styled(FlexCol)`
    gap: 12px;
    width: 100%;
    padding: 16px;
`;

const PostHeaderContainer = styled(FlexRow)`
    width: 100%;
    justify-content: space-between;
`;

const FeedContent = styled.div`
    font-weight: 400;
    font-size: 14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;
    display: block;
    line-height: 20px;
    > p {
        font-size: 14px;
        display: inline;
    }
`;

export default FeedPost;
